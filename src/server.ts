import { serverHttp } from './configs'
import './websockets/layers'

serverHttp.listen(8080, () => console.log('server running on port 8080'))
