Sample Node JS based REST API to identify requests made from TOR network

How to Use:
1. https://blocktor.herokuapp.com/ - Directly hit this url, it will detect your source and dest address and will provide whether the source was a TOR IP or not.

2. Other ways you could use:
- curl --location --request GET 'https://blocktor.herokuapp.com/?sourceIp=100.100.100.100&destIp=1.2.3.4'
- curl --location --request GET 'https://blocktor.herokuapp.com/?sourceIp=100.100.100.100&destIp=1.2.3.4&destPort:8000'

API Specs:

| Name |Type |Description |
|-----|-----|-----|
|sourceIp|String
|destIp|String
|destPort|String|If your service is running on some port)
|found|Bool|It will tell if the request was from TOR or NOT
