// Code generated by protoc-gen-as. DO NOT EDIT.
// Versions:
//   protoc-gen-as v1.3.0
//   protoc        v3.9.1

import { Writer, Reader } from "as-proto/assembly";

export class CreateSCRequest {
  static encode(message: CreateSCRequest, writer: Writer): void {
    writer.uint32(10);
    writer.bytes(message.bytecode);
  }

  static decode(reader: Reader, length: i32): CreateSCRequest {
    const end: usize = length < 0 ? reader.end : reader.ptr + length;
    const message = new CreateSCRequest();

    while (reader.ptr < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.bytecode = reader.bytes();
          break;

        default:
          reader.skipType(tag & 7);
          break;
      }
    }

    return message;
  }

  bytecode: Uint8Array;

  constructor(bytecode: Uint8Array = new Uint8Array(0)) {
    this.bytecode = bytecode;
  }
}
