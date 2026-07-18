import { useState, type ChangeEvent, type FormEvent } from "react";
import emailjs from "@emailjs/browser";
import { AnimatePresence, motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";
import { FiMail, FiPhone, FiGithub, FiLinkedin, FiCheck, FiAlertCircle, FiArrowUpRight } from "react-icons/fi";
import { fadeInUp, staggerContainer } from "@/lib/motion";

interface FormData {
  name: string;
  email: string;
  message: string;
}

interface ToastState {
  type: "success" | "error";
  message: string;
}

const WHATSAPP_PHONE = "923114277133";
const WHATSAPP_MESSAGE = "Hi Zohaib! I found your portfolio and would like to discuss a project.";

const socials = [
  { href: "https://github.com/zohaib9922", icon: FiGithub, label: "GitHub" },
  { href: "https://www.linkedin.com/in/zohaibhasann", icon: FiLinkedin, label: "LinkedIn" },
];

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<ToastState | null>(null);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const showToast = (type: ToastState["type"], message: string) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 3500);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        { from_name: formData.name, from_email: formData.email, message: formData.message },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(
        () => {
          showToast("success", "Message sent successfully");
          setFormData({ name: "", email: "", message: "" });
          setLoading(false);
        },
        () => {
          showToast("error", "Something went wrong. Please try again.");
          setLoading(false);
        }
      );
  };

  const openWhatsApp = () => {
    window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`, "_blank");
  };

  return (
    <section id="contact" className="relative overflow-hidden bg-bg px-6 py-24 sm:px-10 lg:py-32">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -bottom-32 right-0 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />
      </div>

      <div className="relative mx-auto grid max-w-6xl gap-16 lg:grid-cols-2">
        {/* LEFT */}
        <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.3 }}>
          <motion.div variants={fadeInUp} className="mb-4 flex items-center gap-3 text-sm font-medium text-text-2">
            <span className="h-px w-8 bg-accent" />
            Get In Touch
          </motion.div>

          <motion.h2
            variants={fadeInUp}
            className="mb-6 flex flex-wrap items-baseline gap-4 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
          >
            <span className="text-text-1">Let's</span>
            <span className="text-transparent [-webkit-text-stroke:1.5px_var(--color-text-1)]">build</span>
            <span className="text-text-3">something</span>
          </motion.h2>

          <motion.p variants={fadeInUp} className="mb-8 max-w-md text-sm leading-relaxed text-text-2">
            Have a project in mind or want to explore how we can work together? Drop a message and I'll get back to
            you.
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="mb-8 inline-flex items-center gap-2 rounded-full border border-border bg-surface-1 px-4 py-2 text-xs font-medium text-text-2"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full motion-safe:animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            Available for new projects
          </motion.div>

          <motion.div variants={fadeInUp} className="mb-8 flex flex-col gap-3">
            <a
              href="mailto:hzuhaib57@gmail.com"
              className="flex items-center gap-3 rounded-xl border border-border bg-surface-1 p-4 transition-colors hover:border-border-strong"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent-soft text-accent">
                <FiMail />
              </span>
              <div>
                <p className="text-xs text-text-3">Email</p>
                <p className="text-sm font-semibold">hzuhaib57@gmail.com</p>
              </div>
            </a>
            <a
              href="tel:+923114277133"
              className="flex items-center gap-3 rounded-xl border border-border bg-surface-1 p-4 transition-colors hover:border-border-strong"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent-soft text-accent">
                <FiPhone />
              </span>
              <div>
                <p className="text-xs text-text-3">Phone</p>
                <p className="text-sm font-semibold">+92 311 4277133</p>
              </div>
            </a>
            <button
              onClick={openWhatsApp}
              className="flex items-center justify-center gap-2 rounded-xl bg-[#25d366] px-4 py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              <FaWhatsapp size={18} /> Chat on WhatsApp
            </button>
          </motion.div>

          <motion.div variants={fadeInUp} className="flex gap-3">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-text-2 transition-colors hover:border-border-strong hover:text-text-1"
              >
                <s.icon />
              </a>
            ))}
          </motion.div>
        </motion.div>

        {/* RIGHT — form */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="overflow-hidden rounded-2xl border border-border bg-surface-1"
        >
          <div className="flex items-center gap-2 border-b border-border px-4 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
            <span className="ml-1.5 font-mono text-[11px] text-text-3">message.send()</span>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5 p-6 sm:p-8">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="ct-name" className="text-xs font-medium text-text-2">
                Your Name
              </label>
              <input
                id="ct-name"
                name="name"
                type="text"
                required
                disabled={loading}
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                className="rounded-lg border border-border bg-bg px-4 py-2.5 text-sm text-text-1 outline-none transition-colors placeholder:text-text-3 focus:border-accent"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="ct-email" className="text-xs font-medium text-text-2">
                Email Address
              </label>
              <input
                id="ct-email"
                name="email"
                type="email"
                required
                disabled={loading}
                placeholder="john@example.com"
                value={formData.email}
                onChange={handleChange}
                className="rounded-lg border border-border bg-bg px-4 py-2.5 text-sm text-text-1 outline-none transition-colors placeholder:text-text-3 focus:border-accent"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="ct-message" className="text-xs font-medium text-text-2">
                Message
              </label>
              <textarea
                id="ct-message"
                name="message"
                required
                disabled={loading}
                rows={5}
                placeholder="Tell me about your project..."
                value={formData.message}
                onChange={handleChange}
                className="resize-none rounded-lg border border-border bg-bg px-4 py-2.5 text-sm text-text-1 outline-none transition-colors placeholder:text-text-3 focus:border-accent"
              />
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.97 }}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white shadow-glow disabled:opacity-70"
            >
              {loading ? (
                <motion.span
                  className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                />
              ) : (
                <>
                  Send Message <FiArrowUpRight />
                </>
              )}
            </motion.button>
          </form>
        </motion.div>
      </div>

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 20, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: 20, x: "-50%" }}
            className={`fixed bottom-8 left-1/2 z-50 flex items-center gap-2 rounded-full border px-5 py-3 text-sm font-medium shadow-lg ${
              toast.type === "success"
                ? "border-accent/40 bg-accent-soft text-accent"
                : "border-red-400/40 bg-red-400/10 text-red-400"
            }`}
          >
            {toast.type === "success" ? <FiCheck /> : <FiAlertCircle />}
            {toast.message}
          </motion.div>
        )}
      </AnimatePresence>

      {/* WhatsApp FAB */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onClick={openWhatsApp}
        aria-label="Chat on WhatsApp"
        className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25d366] text-white shadow-lg"
      >
        <FaWhatsapp size={22} />
      </motion.button>
    </section>
  );
}
