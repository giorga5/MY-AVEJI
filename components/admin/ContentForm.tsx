"use client";

import { startTransition, useActionState } from "react";
import SubmitButton from "./SubmitButton";
import { updateSiteSettingsAction } from "@/lib/actions/settings";
import type { ActionResult, SiteSettings } from "@/lib/types";

const initialState: ActionResult = {};

export default function ContentForm({ settings }: { settings: SiteSettings | null }) {
  const [state, formAction, isPending] = useActionState(updateSiteSettingsAction, initialState);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    startTransition(() => {
      formAction(formData);
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      {state?.error && <div className="admin-error-banner">{state.error}</div>}
      {state?.success && state.message && (
        <div className="admin-error-banner" style={{ background: "#e6f4ea", borderColor: "#b7dcc0", color: "#2b7a3f" }}>
          {state.message}
        </div>
      )}

      <div className="admin-card">
        <h3 style={{ marginBottom: "1.5rem" }}>ძირითადი ინფორმაცია</h3>
        <div className="form-row form-row-2">
          <div className="form-field">
            <label htmlFor="store_name">მაღაზიის სახელი</label>
            <input type="text" id="store_name" name="store_name" defaultValue={settings?.store_name ?? ""} />
          </div>
          <div className="form-field">
            <label htmlFor="tagline">სლოგანი</label>
            <input type="text" id="tagline" name="tagline" defaultValue={settings?.tagline ?? ""} />
          </div>
        </div>
      </div>

      <div className="admin-card">
        <h3 style={{ marginBottom: "1.5rem" }}>მთავარი გვერდი</h3>
        <div className="form-field">
          <label htmlFor="hero_headline">მთავარი სათაური</label>
          <input type="text" id="hero_headline" name="hero_headline" defaultValue={settings?.hero_headline ?? ""} />
        </div>
        <div className="form-field">
          <label htmlFor="hero_subtext">ქვესათაური</label>
          <textarea id="hero_subtext" name="hero_subtext" rows={3} defaultValue={settings?.hero_subtext ?? ""} />
        </div>
        <div className="form-field">
          <label htmlFor="about_text">ჩვენ შესახებ ტექსტი</label>
          <textarea id="about_text" name="about_text" rows={4} defaultValue={settings?.about_text ?? ""} />
          <p className="form-hint">თუ ცარიელია, „ჩვენ შესახებ" სექცია საიტზე არ გამოჩნდება.</p>
        </div>
      </div>

      <div className="admin-card">
        <h3 style={{ marginBottom: "1.5rem" }}>საკონტაქტო ინფორმაცია</h3>
        <div className="form-row form-row-2">
          <div className="form-field">
            <label htmlFor="phone">ტელეფონი 1</label>
            <input type="tel" id="phone" name="phone" defaultValue={settings?.phone ?? ""} placeholder="+995 555 00 00 00" />
          </div>
          <div className="form-field">
            <label htmlFor="phone_2">ტელეფონი 2</label>
            <input type="tel" id="phone_2" name="phone_2" defaultValue={settings?.phone_2 ?? ""} placeholder="+995 555 00 00 00" />
            <p className="form-hint">არასავალდებულო — თუ გაქვთ მეორე ნომერი (მაგ. სხვა თანამშრომლის).</p>
          </div>
        </div>
        <div className="form-row form-row-2">
          <div className="form-field">
            <label htmlFor="whatsapp_number">WhatsApp ნომერი</label>
            <input
              type="tel"
              id="whatsapp_number"
              name="whatsapp_number"
              defaultValue={settings?.whatsapp_number ?? ""}
              placeholder="995555000000"
            />
            <p className="form-hint">მხოლოდ ციფრები, ქვეყნის კოდით (მაგ: 995555000000)</p>
          </div>
          <div className="form-field">
            <label htmlFor="facebook_url">Facebook ბმული</label>
            <input type="url" id="facebook_url" name="facebook_url" defaultValue={settings?.facebook_url ?? ""} placeholder="https://facebook.com/..." />
          </div>
        </div>
        <div className="form-field">
          <label htmlFor="instagram_url">Instagram ბმული</label>
          <input type="url" id="instagram_url" name="instagram_url" defaultValue={settings?.instagram_url ?? ""} placeholder="https://instagram.com/..." />
        </div>
        <div className="form-field">
          <label htmlFor="address">მისამართი</label>
          <textarea id="address" name="address" rows={2} defaultValue={settings?.address ?? ""} />
        </div>
        <div className="form-field">
          <label htmlFor="business_hours">სამუშაო საათები</label>
          <textarea
            id="business_hours"
            name="business_hours"
            rows={2}
            defaultValue={settings?.business_hours ?? ""}
            placeholder={"ორშ-შაბ: 10:00-20:00\nკვირა: 12:00-18:00"}
          />
        </div>
        <div className="form-field">
          <label htmlFor="map_embed_url">Google Maps embed ბმული</label>
          <input
            type="url"
            id="map_embed_url"
            name="map_embed_url"
            defaultValue={settings?.map_embed_url ?? ""}
            placeholder="https://www.google.com/maps?q=...&output=embed"
          />
          <p className="form-hint">
            Google Maps-ზე მოძებნეთ მისამართი → გააზიარეთ → „რუკის ჩასმა" → დააკოპირეთ ბმული src="..."-დან.
          </p>
        </div>
      </div>

      <div className="admin-form-actions">
        <SubmitButton pending={isPending}>ცვლილებების შენახვა</SubmitButton>
      </div>
    </form>
  );
}
