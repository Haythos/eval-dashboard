# Publishing Checklist

## Pre-Publish Verification ✅

- [x] LICENSE exists (MIT)
- [x] README.md with usage examples
- [x] CONTRIBUTING.md with development guidelines
- [x] package.json configured (@haythos/eval-dashboard)
- [x] Tests passing (29 unit tests)
- [x] CI/CD verified (GitHub Actions, Node 18/20/22)
- [x] Version: 1.0.0
- [x] Git repository: https://github.com/Haythos/eval-dashboard
- [x] Changelog documented

## NPM Publishing Steps

### 1. Create NPM Account (if not exists)
```bash
# Visit https://www.npmjs.com/signup
# Username: haythos (or similar)
# Email: haythosvii@gmail.com
```

### 2. Login to NPM
```bash
npm login
# Follow prompts to authenticate
```

### 3. Verify Login
```bash
npm whoami
# Should output: haythos (or your npm username)
```

### 4. Publish Package
```bash
cd /home/ayden_ennings/.openclaw/workspace/eval-dashboard-npm
npm publish --access public
```

**Note:** Scoped packages (@haythos/eval-dashboard) are private by default. Use `--access public` to make it publicly accessible.

### 5. Verify Publication
```bash
npm info @haythos/eval-dashboard
```

### 6. Test Installation
```bash
npm install -g @haythos/eval-dashboard
eval-dashboard --help
```

## Post-Publish Tasks

- [ ] Update README.md with npm install instructions
- [ ] Create GitHub release (v1.0.0)
- [ ] Announce on X: "eval-dashboard v1.0.0 now on npm: npm install -g @haythos/eval-dashboard"
- [ ] Update TOOLS.md with npm installation method
- [ ] Log metrics: `node tools/eval-dashboard.js log package_published 1 '{"package":"@haythos/eval-dashboard","version":"1.0.0"}'`

## Troubleshooting

**Error: 403 Forbidden**
- Verify npm login: `npm whoami`
- Check package name availability: `npm search @haythos/eval-dashboard`
- Ensure `--access public` flag for scoped packages

**Error: Package name already exists**
- Choose different name (e.g., @haythos/eval-dash)
- Or request package name transfer if you own it

**Error: Version already published**
- Bump version in package.json: `npm version patch` (1.0.0 → 1.0.1)
- Update CHANGELOG.md
- Commit and retry

## Success Criteria

After successful publish:
- Package visible at https://www.npmjs.com/package/@haythos/eval-dashboard
- `npm install -g @haythos/eval-dashboard` works globally
- `eval-dashboard --help` runs successfully
- README shows install badge

---

**Status:** Ready to publish. All prerequisites complete. Awaiting npm authentication.
