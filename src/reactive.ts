// SOURCE: https://ryangjchandler.co.uk/posts/the-magic-behind-reactivity-proxies

const dependancies = new Map();
let currentCallback: any = null;

export function effect(callback: Function) {
    currentCallback = callback;
    callback();
    currentCallback = null;
}

export function computed(callback: Function) {
    let value: any;

    effect(() => {
        value = callback();
    });

    return {
        get value(){
            return value;
        }
    };
}

export function reactive(object: any) {
    if (object === null || typeof object !== "object") {
        return object;
    }

    // nested properties
    for (const property in object) {
        if (Object.prototype.hasOwnProperty.call(object, property)) {
            object[property] = reactive(object[property]);
        }
    }

    return new Proxy(object, {
        get(target, property: string) {
            if (currentCallback === null) {
                return target[property];
            }
            if (!dependancies.has(target)) {
                dependancies.set(target, {});
            }
            const targetEffects = dependancies.get(target);
            if (!targetEffects[property]) {
                targetEffects[property] = [];
            }
            targetEffects[property].push(currentCallback);
            return target[property];
        },
        set(target, property, value) {
            target[property] = value;
            if (dependancies.has(target)) {
                const targetEffects = dependancies.get(target);
                console.log(targetEffects);
                targetEffects[property].forEach((effect: Function) => {
                    effect();
                });
            }
            return true;
        },
        deleteProperty(obj, prop) {
            delete obj[prop];
            return true;
        }
    });
}
