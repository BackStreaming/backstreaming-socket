import { serverHttp } from './config'
import './websockets/layers'

serverHttp.listen(8443, () => {
  console.log("Secure server is listening on port https://localhost:8443");
});