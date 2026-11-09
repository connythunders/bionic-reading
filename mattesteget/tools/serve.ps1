# Enkel lokal webbserver för Mattesteget. Kräver ingen installation (använder PowerShell).
# Starta:  ./tools/serve.ps1          (eller: ./tools/serve.ps1 -Port 9000)
# Öppna:   http://localhost:8080/mattesteget/
# Testa:   http://localhost:8080/mattesteget/tests/index.html
# Stoppa:  Ctrl+C
# Servern lyssnar bara på localhost och serverar bara mappen mattesteget/.
param([int]$Port = 8080)

$repoRoot = (Resolve-Path (Join-Path $PSScriptRoot '..\..')).Path
$appRoot = Join-Path $repoRoot 'mattesteget'

$types = @{
  '.html' = 'text/html; charset=utf-8'; '.js' = 'text/javascript; charset=utf-8'; '.mjs' = 'text/javascript; charset=utf-8'
  '.css' = 'text/css; charset=utf-8'; '.json' = 'application/json; charset=utf-8'
  '.webmanifest' = 'application/manifest+json'; '.svg' = 'image/svg+xml'; '.png' = 'image/png'
  '.ico' = 'image/x-icon'; '.woff2' = 'font/woff2'; '.woff' = 'font/woff'; '.txt' = 'text/plain; charset=utf-8'
  '.md' = 'text/plain; charset=utf-8'
}

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$Port/")
$listener.Start()
Write-Host "Mattesteget körs på http://localhost:$Port/mattesteget/  (Ctrl+C stoppar)"

try {
  while ($listener.IsListening) {
    $task = $listener.GetContextAsync()
    while (-not $task.AsyncWaitHandle.WaitOne(200)) { }   # låter Ctrl+C avbryta
    $ctx = $task.GetAwaiter().GetResult()
    $res = $ctx.Response
    try {
      $urlPath = [System.Uri]::UnescapeDataString($ctx.Request.Url.AbsolutePath)
      if ($urlPath -eq '/') { $res.Redirect("/mattesteget/"); $res.Close(); continue }
      if (-not $urlPath.StartsWith('/mattesteget/')) { $res.StatusCode = 404; $res.Close(); continue }

      $rel = $urlPath.Substring('/mattesteget/'.Length)
      if ($rel -eq '' -or $rel.EndsWith('/')) { $rel += 'index.html' }
      $file = [System.IO.Path]::GetFullPath((Join-Path $appRoot $rel))

      # Skydd mot ../ ut ur appmappen
      if (-not $file.StartsWith($appRoot + [System.IO.Path]::DirectorySeparatorChar) -or -not (Test-Path -LiteralPath $file -PathType Leaf)) {
        $res.StatusCode = 404
        $bytes = [System.Text.Encoding]::UTF8.GetBytes('Sidan finns inte.')
        $res.OutputStream.Write($bytes, 0, $bytes.Length)
      } else {
        $ext = [System.IO.Path]::GetExtension($file).ToLower()
        $res.ContentType = if ($types.ContainsKey($ext)) { $types[$ext] } else { 'application/octet-stream' }
        $res.Headers.Add('Cache-Control', 'no-store')     # alltid färska filer vid utveckling
        $bytes = [System.IO.File]::ReadAllBytes($file)
        $res.ContentLength64 = $bytes.Length
        $res.OutputStream.Write($bytes, 0, $bytes.Length)
      }
    } catch {
      $res.StatusCode = 500
    } finally {
      $res.Close()
    }
  }
} finally {
  $listener.Stop()
}
