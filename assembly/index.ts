import * as env from "./env";

// FIXME use a transformer >>> beg

// using a global to prevent problem with GC
let shared_mem: ArrayBuffer = new ArrayBuffer(0);

export function __alloc(size: i32): ArrayBuffer {
    // /!\ Can't trace here
    // env.log("allocating " + size.toString() + "bytes");

    shared_mem = new ArrayBuffer(size);
    return shared_mem;
}

export function echo(arg: ArrayBuffer): ArrayBuffer {
    assert(changetype<usize>(shared_mem) == changetype<usize>(arg));
    let warg = Uint8Array.wrap(shared_mem);

    env.log("echo input: " + warg.toString());

    shared_mem = env.encode_length_prefixed(warg).buffer;
    return shared_mem;
}


export function call_test(arg: ArrayBuffer): ArrayBuffer {
    assert(changetype<usize>(shared_mem) == changetype<usize>(arg));

    let warg = Uint8Array.wrap(shared_mem);
    env.log("call_test input: " + warg.toString());
    let res = env.test(warg);
    env.log("res len: " + res.length.toString());

    // /!\ do not call any abi here (for exemple log) it will
    // allocate memory and overwrite the buffer
    shared_mem = env.encode_length_prefixed(res).buffer;
    return shared_mem;
}

// Only one buffer for exchange between guest and host implies that
// any exported functions that take a buffer as argument must copy it
// because any call to an abi function will overwrite the buffer.

// export function myfunc(data: Uint8Array) -> Uint8Array {
//     ///...
//  }

// =>

//  export function myfunc(data: Uint8Array) -> Uint8Array {
//     const data_copy = data.copy();
//     const result = myfunc_orig(data_copy);
//     return encode_length_prefixed(result);
//  }


// it should be enough to take a new ref, the GC should not act and new alloc prevent modification from the memory
// export function myfunc(data: Uint8Array) -> Uint8Array {
//     const new_data = shared_mem;
//     const result = myfunc_orig(new_data);
//     return encode_length_prefixed(result);
//  }

// export function myfunc(data: Uint8Array) -> Uint8Array {
//     const new_data = shared_mem;
//     const result = myfunc_orig(new_data);
//     shared_mem = encode_length_prefixed(result);
//     return shared_mem;
//  }
//  (pour éviter que l'array que la fonction retourne ne soit droppé

// FIXME use a transformer  <<< end
