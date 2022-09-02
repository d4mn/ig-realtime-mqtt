export interface RealtimeZeroProvisionPayload {
  zero_product_provisioning_event: ZeroProductProvisioningEvent;
}

export interface ZeroProductProvisioningEvent {
  device_id: string;
  product_name: string;
  zero_provisioned_time: string;
}
