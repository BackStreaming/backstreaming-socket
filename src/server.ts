import { serverHttp } from './configs'
import './websockets/layers'

const port = 3000

serverHttp.listen(port, () => console.log(`server running on port ${port}`))
