DB_CONFIG = {
    "connections": {
        # Dict format for connection
        "default": {
            "engine": "tortoise.backends.mysql",
            "credentials": {
                "host": "db",
                "port": "3306",
                "user": "root",
                "password": "root",
                "database": "blog",
            },
        },
    },
    "apps": {
        "models": {
            "models": ["apps.models"],
            # If no default_connection specified, defaults to 'default'
            "default_connection": "default",
        }
    },
}
