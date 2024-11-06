vcl 4.0;

backend default {
    .host = "node-app";
    .port = "8081";
}

sub vcl_recv {
    if (req.method != "GET" && req.method != "HEAD") {
        return (pass);
    }
}

sub vcl_backend_response {
    set beresp.ttl = 5m;  # Durée du cache pour 5 minutes
}
