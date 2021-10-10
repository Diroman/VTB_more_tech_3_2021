# Build Instructions

## Requirements

- Latest version of [Docker](http://docker.com/)
- [Git](https://git-scm.com/) command-line interface 

## Manual Build on Your Local Machine

1. Clone the GitHub repository to an empty folder on your local machine:

    ```
    git clone https://github.com/Diroman/VTB_more_tech_3_2021.git .
    ```

1. Open folder:

    ```
    cd VTB_more_tech_3_2021/backend
    ```

1. Run ``docker build`` to build docker container:

    ```
    docker build -t backend .
    ```
1. Run ``docker run`` to run docker container:

    ```
    docker run backend
    ```
