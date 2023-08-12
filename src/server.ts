import { serverHttp } from './config'
import './websockets/layers'

serverHttp.listen(8080, () => {
  console.log("Secure server is listening on port 8080");
});