// Code generated by protoc-gen-as. DO NOT EDIT.
// Versions:
//   protoc-gen-as v1.3.0
//   protoc        v3.9.1

import { Writer, Reader } from "as-proto/assembly";

export class GenerateEventRequest {
  static encode(message: GenerateEventRequest, writer: Writer): void {
    writer.uint32(10);
    writer.string(message.event);
  }

  static decode(reader: Reader, length: i32): GenerateEventRequest {
    const end: usize = length < 0 ? reader.end : reader.ptr + length;
    const message = new GenerateEventRequest();

    while (reader.ptr < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.event = reader.string();
          break;

        default:
          reader.skipType(tag & 7);
          break;
      }
    }

    return message;
  }

  event: string;

  constructor(event: string = "") {
    this.event = event;
  }
}