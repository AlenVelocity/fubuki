import 'reflect-metadata'
import { GithubClient } from '../GithubClient'
const requiredMetadataKey = Symbol('required')

export const Required = () => {
    return (target: GithubClient, key: 'userStats', index: number): void => {
        const existingRequiredParameters: number[] = Reflect.getOwnMetadata(requiredMetadataKey, target, key) || []
        existingRequiredParameters.push(index)
        Reflect.defineMetadata(requiredMetadataKey, existingRequiredParameters, target, key)
    }
}

export const Validate = () => {
    return (
        target: GithubClient,
        propertyName: 'userStats',
        descriptor: TypedPropertyDescriptor<typeof target[typeof propertyName]>
    ): ReturnType<typeof target[typeof propertyName]> => {
        const method = descriptor.value
        descriptor.value = function (...args: Parameters<typeof target[typeof propertyName]>) {
            const requiredParameters: number[] = Reflect.getOwnMetadata(requiredMetadataKey, target, propertyName)
            if (requiredParameters) {
                for (const parameterIndex of requiredParameters) {
                    if (parameterIndex >= args.length || args[parameterIndex] === undefined)
                        throw new Error('Missing required argument.')
                }
            }
            return method?.(...(args as Parameters<typeof target[typeof propertyName]>))
        }
    }
}
