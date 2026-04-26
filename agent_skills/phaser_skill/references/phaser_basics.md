# Phaser 3 + TypeScript Basics

## Scenes
- Use `this.add.existing(gameObject)` to add to display list.
- Use `this.physics.add.existing(gameObject)` to add to physics engine.
- Use `this.physics.add.overlap(groupA, groupB, callback)` for collision detection.

## Groups
- Use `Phaser.GameObjects.Group` for management.
- Set `runChildUpdate: true` in group config to auto-call `update()` on children.

## Tweens
- Use `this.tweens.add({ targets, props, duration, ease, onComplete })` for animations.

## Events
- Use `this.events.emit('event-name', ...args)` to communicate between entities and scenes.
- Use `this.events.on('event-name', callback)` to listen for events.

## Timers
- Use `this.time.delayedCall(delay, callback, args, scope)` for one-off delays.
- Use `delta` in `update(time, delta)` for frame-independent timing.
