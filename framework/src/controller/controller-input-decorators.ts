import * as Utils from '@refresh/framework/utils';
import { ControllerInputMetadata } from './controller-input-metadata';

export function Parameter(name: string) {
  return <T extends Object>(target: T, key: keyof T, index: number) => {
    const member = Utils.Object.extractMember(target, key);
    if (member && typeof Utils.Object.isFunctionMember(member.value)) {
      ControllerInputMetadata.attach(member as Utils.Object.FunctionMember, { [index]: name });
      Object.defineProperty(target, member.key, member);
    }
  };
}

export function Headers() {
  return <T extends Object>(target: T, key: keyof T, index: number) => {
    const member = Utils.Object.extractMember(target, key);
    if (member && typeof Utils.Object.isFunctionMember(member.value)) {
      ControllerInputMetadata.attach(member as Utils.Object.FunctionMember, { [index]: 'header' });
      Object.defineProperty(target, member.key, member);
    }
  };
}

export function Query() {
  return <T extends Object>(target: T, key: keyof T, index: number) => {
    const member = Utils.Object.extractMember(target, key);
    if (member && typeof Utils.Object.isFunctionMember(member.value)) {
      ControllerInputMetadata.attach(member as Utils.Object.FunctionMember, { [index]: 'query' });
      Object.defineProperty(target, member.key, member);
    }
  };
}

export function Body() {
  return <T extends Object>(target: T, key: keyof T, index: number) => {
    const member = Utils.Object.extractMember(target, key);
    if (member && typeof Utils.Object.isFunctionMember(member.value)) {
      ControllerInputMetadata.attach(member as Utils.Object.FunctionMember, { [index]: 'body' });
      Object.defineProperty(target, member.key, member);
    }
  };
}