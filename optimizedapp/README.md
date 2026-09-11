# Docker Image Layer Optimization Practical

## Objective
Demonstrate how Docker layer ordering and caching can reduce unnecessary rebuild work and how a smaller base image can reduce image size.

## Project structure
- app.py
- requirements.txt
- Dockerfile.bad
- Dockerfile
- .dockerignore

## 1. Open PowerShell in this folder
```powershell
cd optimizedapp
```

## 2. Build the bad image
```powershell
docker build -f Dockerfile.bad -t optimizedapp:bad .
```

## 3. Run the bad image
```powershell
docker run --rm optimizedapp:bad
```

Expected:
```text
Hello from optimized Docker app
```

## 4. Inspect bad image layers
```powershell
docker history optimizedapp:bad
```

## 5. Build the optimized image
```powershell
docker build -t optimizedapp:v1 .
```

## 6. Run the optimized image
```powershell
docker run --rm optimizedapp:v1
```

## 7. Inspect optimized image layers
```powershell
docker history optimizedapp:v1
```

## 8. List images
```powershell
docker images
```

## 9. Measure the bad build on Windows PowerShell
```powershell
Measure-Command { docker build -f Dockerfile.bad -t optimizedapp:bad . }
```

## 10. Measure the optimized build
```powershell
Measure-Command { docker build -t optimizedapp:v1 . }
```

Important: `time` is normally used on Linux/macOS. In Windows PowerShell use `Measure-Command`.

## 11. Demonstrate the real cache advantage
Change app.py to:
```python
print("Hello from optimized Docker app - updated version")
```

Then rebuild the bad image:
```powershell
Measure-Command { docker build -f Dockerfile.bad -t optimizedapp:bad2 . }
```

Rebuild the optimized image:
```powershell
Measure-Command { docker build -t optimizedapp:v2 . }
```

The optimized Dockerfile copies requirements.txt and installs dependencies before copying app.py. Therefore, if only app.py changes, Docker can reuse the dependency layer.

## 12. Direct timer in seconds
```powershell
$start = Get-Date
docker build -f Dockerfile.bad -t optimizedapp:bad .
$end = Get-Date
$duration = $end - $start
Write-Host "Bad Dockerfile build time: $($duration.TotalSeconds) seconds"
```

Optimized:
```powershell
$start = Get-Date
docker build -t optimizedapp:v1 .
$end = Get-Date
$duration = $end - $start
Write-Host "Optimized Dockerfile build time: $($duration.TotalSeconds) seconds"
```

## 13. Save timing output
```powershell
Measure-Command { docker build -f Dockerfile.bad -t optimizedapp:bad . } | Out-File bad_time.txt
Measure-Command { docker build -t optimizedapp:v1 . } | Out-File good_time.txt
```

## Key Dockerfile commands
- FROM: selects the base image
- WORKDIR: sets the working directory
- COPY: copies files into the image
- RUN: executes a command during image build
- CMD: default command when the container starts

## Key concept
Copy rarely changing files first and frequently changing files later so Docker can reuse cached layers.

## Viva answers
1. Why is the optimized Dockerfile faster after a code change?
   Because the dependency layer can remain cached when only source code changes.

2. Why use python:3.11-slim?
   It is smaller than the full python:3.11 image, generally reducing image size and transfer requirements.

3. Why copy requirements.txt before app.py?
   Dependencies usually change less often than application code.

4. Why use .dockerignore?
   To exclude unnecessary files from the Docker build context.

5. Why use docker history?
   To inspect image history/layers.

6. Why use a timer?
   To measure build performance and provide evidence for the comparison.
