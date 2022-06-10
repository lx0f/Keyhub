class Methods {
    static methodOptions(method ,{DELETE, PATCH, PUT, TRACE, HEAD, CONNECT, OPTIONS} = {}) {
        switch(method) {
            case "DELETE":
                DELETE?.()
                break;
            case "PATCH":
                PATCH?.()
                break;
            case "PUT":
                PUT?.()
                break;
            case "TRACE":
                TRACE?.()
                break;
            case "HEAD":
                HEAD?.()
                break;
            case "CONNECT":
                CONNECT?.()
                break;
            case "OPTIONS":
                OPTIONS?.()
                break;
        }
    } 
}

module.exports = Methods