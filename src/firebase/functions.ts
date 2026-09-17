import { httpsCallable } from 'firebase/functions'
import { functions } from './config'

export { functions }

export function getCallableFunction<ReqData = unknown, ResData = unknown>(name: string) {
  return httpsCallable<ReqData, ResData>(functions, name)
}

export async function callFunction<ReqData = unknown, ResData = unknown>(
  name: string,
  data?: ReqData
): Promise<ResData> {
  const fn = getCallableFunction<ReqData, ResData>(name)
  const res = await fn(data)
  return res.data
}
