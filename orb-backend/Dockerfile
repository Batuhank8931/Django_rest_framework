# Use the official Python image as a base
FROM python:3.11

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set the working directory in the container
WORKDIR /app

# Copy the rest of the application code into the container
COPY . /app

# Copy the requirements file into the container
COPY ./requirements.txt /app

# Install dependencies
RUN pip install --upgrade pip
RUN pip install -r requirements.txt

# Make migrations and migrate
RUN python manage.py makemigrations
RUN python manage.py migrate

# Run the application
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
