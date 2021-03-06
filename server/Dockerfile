FROM python:3.8-buster AS builder
WORKDIR /opt/app/server
COPY requirements.txt /opt/app/server/requirements.txt
RUN pip install -r requirements.txt

FROM builder AS dev
RUN apt-get update \
  && apt-get install -y sudo \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*

# Mount vscode extentions stored in local volumes
COPY --from=builder /usr/local/lib/python3.8/site-packages /usr/local/lib/python3.8/site-packages
COPY --from=builder /usr/local/bin/uvicorn /usr/local/bin/uvicorn
COPY . /opt/app/server
WORKDIR /opt/app/server
ENV PYTHONBUFFERED=TRUE
EXPOSE 7000
CMD [ "uvicorn", "apps:main", "--host", "0.0.0.0", "--port", "7000", "--workers", "4", "--reload" ]


FROM builder AS runner
COPY --from=builder /usr/local/lib/python3.8/site-packages /usr/local/lib/python3.8/site-packages
RUN apt update \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*

COPY . /opt/app/server
WORKDIR /opt/app/server
ENV PYTHONBUFFERED=TRUE
EXPOSE 7000