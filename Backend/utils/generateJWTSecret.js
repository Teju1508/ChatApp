import crypto from "crypto";
const randomBase64String = crypto.randomBytes(32).toString('base64');

export default randomBase64String;