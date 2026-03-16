export default function Footer() {
  return (
    <footer className="px-6 mt-8 mb-6 text-xs" style={{ opacity: 0.35 }}>
      <span>
        terraform lore is a community maintained resource built by{' '}
        <a
          href="https://x.com/TerraformsOTC"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: 'inherit' }}
        >
          TerraformsOTC
        </a>
        {' '}and Claude
      </span>
    </footer>
  );
}
