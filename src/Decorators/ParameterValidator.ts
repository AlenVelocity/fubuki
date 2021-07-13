import 'reflect-metadata'
import { GithubClient } from '../GithubClient'
import { IUserStats } from '../query/User'
const requiredMetadataKey = Symbol('required')

type Filter<T> = {
    [K in keyof T as Exclude<K, 'BASE_URL' | 'token'>]: T[K]
}

export const Required = () => {
    return (target: GithubClient, key: keyof Filter<GithubClient>, index: number): void => {
        const existingRequiredParameters: number[] = Reflect.getOwnMetadata(requiredMetadataKey, target, key) || []
        existingRequiredParameters.push(index)
        Reflect.defineMetadata(requiredMetadataKey, existingRequiredParameters, target, key)
    }
}

export const Validate = () => {
    return (
        target: GithubClient,
        propertyName: keyof Filter<GithubClient>,
        descriptor: TypedPropertyDescriptor<typeof target[typeof propertyName]>
    ): void => {
        const method = descriptor.value as unknown as () => IUserStats
        ;(descriptor.value as unknown as () => Promise<IUserStats>) = async function (
            ...args: Parameters<typeof target[typeof propertyName]>
        ) {
            const requiredParameters: number[] = Reflect.getOwnMetadata(requiredMetadataKey, target, propertyName)
            if (requiredParameters) {
                for (const parameterIndex of requiredParameters) {
                    if (parameterIndex >= args.length || args[parameterIndex] === undefined)
                        throw new Error('Missing required argument.')
                }
            }
            //@ts-expect-error Cause the `@param` decorator to be applied to the wrong type.
            return method?.apply(this, args as unknown[]) as unknown as IUserStats
        }
    }
}
