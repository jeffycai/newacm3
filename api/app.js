export function queryByHostname(post,appDomain){
    return post('/v1/app/queryByHostname',{appDomain})
}