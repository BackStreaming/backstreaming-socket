import { serverHttp } from './config'
import './services/layers'

serverHttp.listen(8443, () => {
  console.log("Secure server is listening on port 8443");
});