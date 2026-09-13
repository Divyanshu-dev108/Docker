DOCKER IMAGE LAYER OPTIMIZATION PRACTICAL

OBJECTIVE
Compare a normal Dockerfile with an optimized Dockerfile and understand Docker layer caching.

WINDOWS POWERSHELL COMMANDS

1. Check Docker:
docker --version
docker compose version

2. Open PowerShell in this folder and check files:
dir

3. Build normal image:
docker build -f Dockerfile.bad -t optimizedapp:bad .

4. Run normal image:
docker run --rm optimizedapp:bad

Expected:
Hello from Docker Layer Optimization Practical

5. View layers:
docker history optimizedapp:bad

6. Build optimized image:
docker build -t optimizedapp:v1 .

7. Run optimized image:
docker run --rm optimizedapp:v1

8. View optimized layers:
docker history optimizedapp:v1

9. List images:
docker images

10. Measure build time in Windows PowerShell:
Measure-Command { docker build -f Dockerfile.bad -t optimizedapp:bad . }
Measure-Command { docker build -t optimizedapp:v1 . }

Do not use 'time' in Windows PowerShell. Use Measure-Command.

11. Cache demonstration:
Change app.py to:
print("Hello from Docker Layer Optimization Practical - Updated")

Then run:
Measure-Command { docker build -f Dockerfile.bad -t optimizedapp:bad2 . }
Measure-Command { docker build -t optimizedapp:v2 . }

WHY OPTIMIZED?
The normal Dockerfile copies everything before installing dependencies. Any file change can invalidate that layer. The optimized Dockerfile copies requirements.txt first, installs dependencies, and copies app.py afterward. If only app.py changes, Docker can reuse the dependency layer.

12. Clean build:
docker build --no-cache -t optimizedapp:clean .

13. Useful commands:
docker ps
docker ps -a
docker images
docker container prune
docker image prune

IMPORTANT TERMS
FROM = base image
WORKDIR = working directory
COPY = copy files into image
RUN = execute build command
CMD = default startup command
.dockerignore = excludes unnecessary build files

VIVA QUESTIONS
1. What is Docker? A platform for building and running containers.
2. What is an image? A read-only template for containers.
3. What is a container? A running instance of an image.
4. What is a layer? A filesystem change created during image build.
5. What is cache? Reusable build data that avoids repeated work.
6. Why copy requirements.txt first? Dependencies change less often than source code.
7. What does -t mean? Names and tags the image.
8. What does -f mean? Selects a Dockerfile.
9. What does . mean? Current directory/build context.
10. What does --no-cache mean? Build without cached layers.

EXAM ANSWER
Docker layer optimization improves build performance by copying rarely changing files before frequently changing files. Copying requirements.txt and installing dependencies before copying app.py allows Docker to reuse the dependency layer when only application code changes. A slim base image can also reduce image size.
