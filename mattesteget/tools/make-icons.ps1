# Ritar appens ikoner (tre trappsteg) som PNG. Kräver ingen installation, bara Windows PowerShell.
# Kör vid behov:  ./tools/make-icons.ps1   Resultatet hamnar i icons/.
Add-Type -AssemblyName System.Drawing

$out = Join-Path (Resolve-Path (Join-Path $PSScriptRoot '..')).Path 'icons'
New-Item -ItemType Directory -Force $out | Out-Null

function New-Icon([int]$size, [string]$name, [bool]$maskable) {
  $bmp = New-Object System.Drawing.Bitmap $size, $size
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::AntiAlias
  $g.Clear([System.Drawing.Color]::Transparent)
  $u = $size / 100.0

  $accent = New-Object System.Drawing.SolidBrush ([System.Drawing.ColorTranslator]::FromHtml('#0A58A8'))
  $white = New-Object System.Drawing.SolidBrush ([System.Drawing.Color]::White)

  if ($maskable) {
    # Maskbar ikon: hela rutan fylls, operativsystemet beskär själv.
    $g.FillRectangle($accent, 0, 0, $size, $size)
  } else {
    $r = 18 * $u * 2
    $path = New-Object System.Drawing.Drawing2D.GraphicsPath
    $path.AddArc(0, 0, $r, $r, 180, 90)
    $path.AddArc($size - $r, 0, $r, $r, 270, 90)
    $path.AddArc($size - $r, $size - $r, $r, $r, 0, 90)
    $path.AddArc(0, $size - $r, $r, $r, 90, 90)
    $path.CloseFigure()
    $g.FillPath($accent, $path)
  }

  # Tre trappsteg som stiger åt höger. Allt ryms inom den säkra zonen (mitten 80 procent).
  $bottom = 78 * $u
  $x = 22
  foreach ($h in 20, 38, 56) {
    $g.FillRectangle($white, $x * $u, $bottom - $h * $u, 18 * $u, $h * $u)
    $x += 19
  }

  $bmp.Save((Join-Path $out $name), [System.Drawing.Imaging.ImageFormat]::Png)
  $g.Dispose(); $bmp.Dispose()
}

New-Icon 192 'icon-192.png' $false
New-Icon 512 'icon-512.png' $false
New-Icon 512 'icon-maskable-512.png' $true
New-Icon 180 'apple-touch-icon.png' $true
Write-Host "Ikoner skapade i $out"
