FROM python:3.10.5 as base

COPY . /var/www

WORKDIR /var/www

RUN pip install --upgrade pip && pip install -r requirements.txt && apt update && apt -y upgrade

EXPOSE 5000

FROM base as test

# Install chrome (v103.0.5060.134)
ARG CHROME_VERSION="103.0.5060.134-1"
RUN wget --no-verbose -O /var/tmp/chrome.deb https://dl.google.com/linux/chrome/deb/pool/main/g/google-chrome-stable/google-chrome-stable_${CHROME_VERSION}_amd64.deb \
  && apt install -y /var/tmp/chrome.deb \
  && rm /var/tmp/chrome.deb

# Install included chromedriver (v103.0.5060.134) for selenium
RUN apt install unzip
RUN unzip ./tests/bin/chromedriver_linux64.zip -d $HOME/bin

# Resolve any dependency issues
RUN apt update && apt -y upgrade

RUN chmod 755 ./tests/bin/test_with_server.sh
ENV FLASK_CONFIG=testing
ENV FLASK_APP='app:create_app("testing")'
CMD ./tests/bin/test_with_server.sh

FROM base as development
ENV FLASK_CONFIG=development
ENV FLASK_APP='app:create_app("default")'
CMD flask run --host=0.0.0.0 --port=5000

FROM base as preproduction
ENV FLASK_CONFIG=preproduction
ENV FLASK_APP='app:create_app("preproduction")'
CMD gunicorn --bind 0.0.0.0:5000 application:application

FROM base as production
ENV FLASK_CONFIG=production
ENV FLASK_APP='app:create_app("production")'
CMD gunicorn --bind 0.0.0.0:5000 application:application