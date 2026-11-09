# Skapar precache.js: listan över filer som sparas för offline och en versionshash.
# Kör efter varje ändring av filer som ska följa med offline:  ./tools/precache.ps1
# Hashen räknas på samma sätt som i tests/precacheHash.js, så att testerna kan se om listan är gammal.
$ErrorActionPreference = 'Stop'
$root = (Resolve-Path (Join-Path $PSScriptRoot '..')).Path
$textExt = @('.html', '.js', '.css', '.json', '.webmanifest', '.svg', '.txt')

# Måste vara samma regler som isPrecached() i tests/precacheHash.js
function Test-Precached([string]$rel) {
  if ($rel -match '^(tests|tools|node_modules|\.github)/') { return $false }
  if ($rel -match '\.(md|ps1)$') { return $false }
  if ($rel -match '\.test\.js$') { return $false }
  if (@('sw.js', 'precache.js', 'package.json', 'package-lock.json', 'tsconfig.json', '.gitignore') -contains $rel) { return $false }
  return $true
}

$files = @(Get-ChildItem -Path $root -Recurse -File -Force |
  ForEach-Object { $_.FullName.Substring($root.Length + 1).Replace('\', '/') } |
  Where-Object { Test-Precached $_ })
[string[]]$files = $files
[Array]::Sort($files, [StringComparer]::Ordinal)

$sha = [System.Security.Cryptography.SHA256]::Create()
function Get-Hex([byte[]]$bytes) { -join ($sha.ComputeHash($bytes) | ForEach-Object { $_.ToString('x2') }) }
$utf8 = New-Object System.Text.UTF8Encoding $false

$joined = New-Object System.Text.StringBuilder
foreach ($rel in $files) {
  $bytes = [System.IO.File]::ReadAllBytes((Join-Path $root $rel))
  $ext = [System.IO.Path]::GetExtension($rel).ToLowerInvariant()
  if ($textExt -contains $ext) {
    # Radbrytningar normaliseras så att Windows och Linux ger samma hash.
    $text = $utf8.GetString($bytes).Replace("`r`n", "`n")
    $bytes = $utf8.GetBytes($text)
  }
  [void]$joined.Append($rel).Append(':').Append((Get-Hex $bytes)).Append("`n")
}
$version = (Get-Hex ($utf8.GetBytes($joined.ToString()))).Substring(0, 12)

$list = ($files | ForEach-Object { '    "' + $_ + '"' }) -join ",`n"
$content = "// Skapas av tools/precache.ps1. Redigera inte för hand.`nself.PRECACHE = {`n  version: `"$version`",`n  files: [`n$list`n  ]`n};`n"
[System.IO.File]::WriteAllText((Join-Path $root 'precache.js'), $content, $utf8)
Write-Host "precache.js skapad: $($files.Count) filer, version $version"
