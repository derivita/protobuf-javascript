import { ConformanceRequest } from './conformance_request.js';
import { ConformanceResponse } from './conformance_response.js';
/**
 * Creates a `proto.conformance.ConformanceResponse` response according to the
 * `proto.conformance.ConformanceRequest` request.
 * @return response
 */
declare function doTest(request: ConformanceRequest): ConformanceResponse;
export { doTest };
