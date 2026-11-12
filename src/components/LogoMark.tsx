import { siteConfig } from '../config/site'

export default function LogoMark() {
  return (
    <a className="logo-mark" href="#inicio" aria-label={`${siteConfig.name} — voltar ao início`}>
      {siteConfig.logo ? (
        <img src={siteConfig.logo} alt="" />
      ) : (
        <>
          <span>AS</span>
          <small>
            Arthur
            <br />
            SC
          </small>
        </>
      )}
    </a>
  )
}
