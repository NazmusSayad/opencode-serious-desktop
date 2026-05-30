import type { Configuration } from 'electron-builder'

const channel = (() => {
  const raw = process.env.OPENCODE_CHANNEL
  if (raw === 'dev' || raw === 'beta' || raw === 'prod') return raw
  return 'dev'
})()

const getBase = (): Configuration => ({
  artifactName: 'opencode-desktop-${os}-${arch}.${ext}',
  directories: {
    output: 'dist',
    buildResources: 'resources'
  },
  files: ['out/**/*', 'resources/**/*'],
  mac: {
    category: 'public.app-category.developer-tools',
    icon: 'resources/icons/icon.icns',
    hardenedRuntime: true,
    gatekeeperAssess: false,
    entitlements: 'resources/entitlements.plist',
    entitlementsInherit: 'resources/entitlements.plist',
    notarize: false,
    target: ['dmg', 'zip']
  },
  dmg: {
    sign: true
  },
  protocols: {
    name: 'OpenCode',
    schemes: ['opencode']
  },
  win: {
    icon: 'resources/icons/icon.ico',
    target: ['nsis'],
    verifyUpdateCodeSignature: false
  },
  nsis: {
    oneClick: true,
    perMachine: false,
    installerIcon: 'resources/icons/icon.ico',
    installerHeaderIcon: 'resources/icons/icon.ico'
  },
  linux: {
    icon: 'resources/icons',
    category: 'Development',
    target: ['AppImage', 'deb', 'rpm']
  }
})

function getConfig() {
  const base = getBase()

  switch (channel) {
    case 'dev': {
      return {
        ...base,
        appId: 'ai.opencode.desktop.dev',
        productName: 'OpenCode Dev'
      }
    }
    case 'beta': {
      return {
        ...base,
        appId: 'ai.opencode.desktop.beta',
        productName: 'OpenCode Beta',
        protocols: { name: 'OpenCode Beta', schemes: ['opencode'] },
        publish: {
          provider: 'github',
          owner: 'anomalyco',
          repo: 'opencode-beta',
          channel: 'latest'
        } as any
      }
    }
    case 'prod': {
      return {
        ...base,
        appId: 'ai.opencode.desktop',
        productName: 'OpenCode',
        protocols: { name: 'OpenCode', schemes: ['opencode'] },
        publish: {
          provider: 'github',
          owner: 'anomalyco',
          repo: 'opencode',
          channel: 'latest'
        } as any
      }
    }
    default:
      return base
  }
}

export default getConfig()
