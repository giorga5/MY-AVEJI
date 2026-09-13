"use server";

import { createClient } from "@/lib/supabase/server";
import type { ActionResult } from "@/lib/types";

export async function changePasswordAction(
  _prevState: ActionResult | undefined,
  formData: FormData
): Promise<ActionResult> {
  const currentPassword = String(formData.get("current_password") ?? "");
  const newPassword = String(formData.get("new_password") ?? "");
  const confirmPassword = String(formData.get("confirm_password") ?? "");

  if (!currentPassword || !newPassword) return { error: "შეავსეთ ყველა ველი." };
  if (newPassword.length < 8) return { error: "ახალი პაროლი უნდა შეიცავდეს მინიმუმ 8 სიმბოლოს." };
  if (newPassword !== confirmPassword) return { error: "ახალი პაროლები არ ემთხვევა." };

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email) return { error: "სესია ვერ მოიძებნა, გთხოვთ ხელახლა შეხვიდეთ." };

  const { error: reauthError } = await supabase.auth.signInWithPassword({
    email: user.email,
    password: currentPassword,
  });
  if (reauthError) return { error: "მიმდინარე პაროლი არასწორია." };

  const { error } = await supabase.auth.updateUser({ password: newPassword });
  if (error) return { error: "პაროლის შეცვლა ვერ მოხერხდა: " + error.message };

  return { success: true, message: "პაროლი წარმატებით შეიცვალა." };
}
