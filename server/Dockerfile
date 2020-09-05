FROM python:3.8-buster AS builder
WORKDIR /opt/app/server
COPY requirements.lock /opt/app/server/requirements.lock
RUN pip install -r requirements.lock

FROM builder AS dev
ARG USERNAME=app-user
ARG USER_UID=1000
ARG USER_GID=$USER_UID

# Create the user
RUN groupadd --gid $USER_GID $USERNAME \
  && useradd --uid $USER_UID --gid $USER_GID -m $USERNAME \
  && usermod --shell /bin/bash app-user \
  # [Optional] Add sudo support. Omit if you don't need to install software after connecting.
  && apt-get update \
  && apt-get install -y sudo \
  && echo $USERNAME ALL=\(root\) NOPASSWD:ALL > /etc/sudoers.d/$USERNAME \
  && chmod 0440 /etc/sudoers.d/$USERNAME \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*
USER $USERNAME

# Mount vscode extentions stored in local volumes
RUN mkdir -p /home/$USERNAME/.vscode-server/extensions \
  && chown -R $USERNAME /home/$USERNAME/.vscode-server
COPY --from=builder /usr/local/lib/python3.8/site-packages /usr/local/lib/python3.8/site-packages
COPY --from=builder /usr/local/bin/uvicorn /usr/local/bin/uvicorn
COPY . /opt/app/server
WORKDIR /opt/app/server
ENV PYTHONBUFFERED=TRUE
EXPOSE 8000


FROM builder AS runner
COPY --from=builder /usr/local/lib/python3.8/site-packages /usr/local/lib/python3.8/site-packages
RUN apt update \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*

COPY . /opt/app/server
WORKDIR /opt/app/server
ENV PYTHONBUFFERED=TRUE
EXPOSE 8000