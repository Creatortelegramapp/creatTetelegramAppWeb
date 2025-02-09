.NOTPARALLEL:
SHELL := /bin/bash
.EXPORT_ALL_VARIABLES:

# By default, do NOT prepend "sudo".
# Only prepend "sudo" if CI=true is passed.
ifeq ($(CI),true)
    SUDO := sudo
else
    SUDO :=
endif

build:
	$(SUDO) nerdctl compose -f docker/docker-compose.yml build

up:
	$(SUDO) nerdctl compose -f docker/docker-compose.yml up -d

run: build up
