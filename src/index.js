'use strict'

const debug = require('debug')('require-and-forget')
const path = require('path')

function relativeResolve(parent, name) {
  const fullPath = path.join(path.dirname(parent.filename), name)
  const resolvedPath = require.resolve(fullPath)
  return resolvedPath
}

function requireAndForget(name) {
  const parent = module.parent
  if (!parent) {
    throw new Error('Cannot load without a parent module')
  }
  if (!name) {
    throw new Error('Missing module path or name')
  }

  debug('parent', parent)
  debug('needs', name)

  if (global.__require_fn) {
    debug('global.__require_fn is set to', global.__require_fn.name)
  }

  const requireFn = global.__require_fn || require
  const resolveFn = requireFn.resolve || require.resolve

  const resolvedPath = path.isAbsolute(name)
    ? resolveFn(name)
    : relativeResolve(parent, name)
  debug('its resolved path', resolvedPath)
  const value = requireFn(resolvedPath)
  delete require.cache[resolvedPath]
  return value
}
module.exports = requireAndForget
