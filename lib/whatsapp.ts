/** Builds a wa.me click-to-chat link from the admin-configured WhatsApp number. */
export function buildWhatsappLink(whatsappNumber: string | null | undefined): string | null {
  if (!whatsappNumber) return null;
  const digits = whatsappNumber.replace(/[^0-9]/g, "");
  if (!digits) return null;
  return `https://wa.me/${digits}`;
}
