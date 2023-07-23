const {createClient}=require("redis");

const client = createClient({
    password: 'b1uV7ZqYPHHkuCpdsoe6bfkegn3Cyu5X',
    socket: {
        host: 'redis-11574.c305.ap-south-1-1.ec2.cloud.redislabs.com',
        port: 11574
    }
});

module.exports={client};