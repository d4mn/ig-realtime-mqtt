# Realtime

## Important notes for users

**Don't create more than one connection using the same state/device!**
This will lead you to unexpected behaviour when the previous connection from the same device is being dropped by instagram server.
Instagram server doesn't tell the reason, it just drops the connection without explanations,
so IGPAPI is not able to tell you what is going wrong.
That's why you should pay close attention to this aspect while developing your systems.
Moreover, IGPAPI have built-in auto-reconnect mechanism, so if you run 2 IGPAPI realtime connections simultaneously,
you will end up in endless reconnection loop on both of these connections
that will lead you to losing realtime events in reconnection gaps.

## Advanced

This package contains the base client to handle realtime events on both web and Android.
It appears both platforms talk to the same realtime interface/server (but with a different connect/auth process).

The `IgpapiRealtime` is the abstract class both implementations inherit from.
It's main purpose is to **handle** and **decode** packets as well as manage the underlying mqtt client (e.g. reconnecting).

- It provides helper functions to simplify sending and receiving:

  - `preparePayload` Converts and encodes any data appropriately
  - `encode-` and `decodeTopic` map topic ids to their appropriate names
  - `publishToMqtt`, `request` and `mqttSubscribe` unify the publishing/subscribing

- It provides user facing methods/properties:
  - `connect`
  - `irisSubscribe`, `graphQlSub`, `graphQlUnsub`, `skywalkerSub` and `skywalkerUnsub` simplify the subscription to events
  - `directCommands` encodes direct messages
- It provides implementation specific abstract methods:
  - `createMqttClient` creates a transport/client for mqtt packets
  - `connectToBroker` connects the transport/client
  - `postConnect` is called after the connection succeeded in order to perform platform specific tasks
- It provides an interface for mixins.

## Developing

In order to find events or validate existing logic, you have two options:

1. **Test** the client with debug logging enabled (highly recommended even if not testing).
   This can be done by simply interacting with the logged in account and logging messages.

2. **Reverse engineer** existing logic. This is platform specific.
   For more information, look in the [`android realtime`](/packages/android/src/realtime) and [`web realtime`](/packages/web/src/realtime) packages respectively.
   This a short summary:

   - **Web:** Use your browsers debugger feature. It's a big helper. You can break at any statement without needing to set up anything.
     Code related to mqtt can be found in `/DirectMqtt.js/`. The debugger probably has a button to **pretty print** the minified code.
     `__d(function (...) {})` is just an export.
   - **Android:** For Android you may want to listen to the MQTT messages (guide is in [`android realtime`](/packages/android/src/realtime)).
     But you may also want to look through the code.
     You can use a decompiler for apks and **search** for important strings.
     This is the easiest method of finding the code responsible for a feature.
     Personally, I'd recommend [GDA](https://github.com/charles2gan/GDA-android-reversing-Tool) on Windows as it can search for Cross References (`X`),
     which is a huge timesaver.
