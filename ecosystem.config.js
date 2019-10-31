module.exports = {
    apps : [
        {
            name      : 'NestTestApp',
            script    : 'dist/server.js',
            exec_mode : 'cluster_mode',
            instances : 'max'
        }
    ],
    deploy : {
        production : {
            user : '',
            host : '',
            ref  : '',
            repo : '',
            path : '',
            'pre-deploy-local' : 'echo \'This is a local executed command\'',
            'post-deploy' : 'npm install && pm2 startOrRestart ecosystem.json --env production',
        },
        staging : {
            user : '',
            host : '',
            ref  : '',
            repo : '',
            path : '',
            'post-deploy' : 'pm2 startOrRestart ecosystem.json --env dev',
            'env'  : {
                'NODE_ENV': 'staging'
            }
        }
    }
};

