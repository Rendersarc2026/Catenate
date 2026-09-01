import { company, footerColumns } from "@/data/catenate"

export function SiteFooter() {
  return (
    <footer className="content-pad overflow-hidden bg-blue-deep pt-[clamp(56px,6vw,86px)] pb-[clamp(20px,2.5vw,40px)] text-white">
      <div className="grid grid-cols-[1.3fr_repeat(3,1fr)] gap-8.5 border-b border-white/14 pb-13 max-lg:grid-cols-2">
        <div>
          <h4 className="mb-4 text-[11px] font-medium tracking-[0.16em] text-white/50 uppercase">
            Catenate
          </h4>
          <address className="text-[14.5px] leading-[1.9] not-italic text-white/76">
            {company.address.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
            <br />
            <a href={`tel:${company.phone.replace(/\s/g, "")}`} className="block hover:text-white">
              {company.phone}
            </a>
            <a href={`mailto:${company.email}`} className="block hover:text-white">
              {company.email}
            </a>
          </address>
        </div>

        {footerColumns.map((column) => (
          <div key={column.heading}>
            <h4 className="mb-4 text-[11px] font-medium tracking-[0.16em] text-white/50 uppercase">
              {column.heading}
            </h4>
            <ul className="list-none text-[14.5px] leading-[2.1]">
              {column.links.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-white/76 hover:text-white">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="tnum flex flex-wrap justify-between gap-5 py-5.5 text-xs text-white/45">
        <span>{company.legal}</span>
        <span>© {new Date().getFullYear()} Catenate. All rights reserved.</span>
      </div>

      <div className="foot-mark" aria-hidden="true">
        CATENATE
      </div>
    </footer>
  )
}
