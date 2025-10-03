import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SiteHeader } from "@/components/site/SiteHeader";
import { SiteFooter } from "@/components/site/SiteFooter";
import { IconAlertTriangle, IconBug, IconIcons, IconLoader2, IconMessage, IconPaperclip, IconQuote, IconSend, IconX } from "@tabler/icons-react";
import { HeroBackground } from "@/components/ui/shap-loading-hero";
import { SEO } from "@/components/SEO";

const ContactPage = () => {
  const [form, setForm] = useState({ name: '', message: '' });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const fileRef = useRef(null);

  const TELEGRAM_BOT_TOKEN = '7762199917:AAFvdAJQZRrZm_ouEoHHDGxPPMr4lUT6T4Y';
  const TELEGRAM_CHAT_ID = '5058242890';

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleFile = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    if (selectedFile.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => setPreview({ type: 'image', url: e.target.result, name: selectedFile.name, size: selectedFile.size });
      reader.readAsDataURL(selectedFile);
    } else {
      setPreview({ type: 'file', name: selectedFile.name, size: selectedFile.size, ext: selectedFile.name.split('.').pop() });
    }
  };

  const removeFile = () => {
    setFile(null);
    setPreview(null);
    if (fileRef.current) fileRef.current.value = '';
  };

  const formatSize = (bytes) => {
    if (!bytes) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return (bytes / Math.pow(k, i)).toFixed(1) + ' ' + sizes[i];
  };

  const handleSubmit = () => {
    if (!form.name.trim() || !form.message.trim()) {
      setStatus({ type: 'error', msg: 'Please fill all required fields' });
      return;
    }
    setShowModal(true);
  };

  const sendMessage = async () => {
    setLoading(true);
    setShowModal(false);

    try {
      const text = `🔔 Contact Form\n👤 ${form.name}\n💬 ${form.message}\n📅 ${new Date().toLocaleString()}`;

      await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text })
      });

      if (file) {
        const formData = new FormData();
        formData.append('chat_id', TELEGRAM_CHAT_ID);
        formData.append('document', file);
        formData.append('caption', `📎 From ${form.name}`);

        await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendDocument`, {
          method: 'POST',
          body: formData
        });
      }

      setStatus({ type: 'success', msg: 'Message sent successfully!' });
      setForm({ name: '', message: '' });
      removeFile();
    } catch (error) {
      setStatus({ type: 'error', msg: 'Failed to send message' });
    }
    setLoading(false);
  };

  const reasons = [
    { icon: IconIcons, title: "Request Icons", desc: "Need specific icons? Let us know." },
    { icon: IconBug, title: "Report Issues", desc: "Found bugs? We're here to help." },
    { icon: IconMessage, title: "Feedback", desc: "Share thoughts and suggestions." },
    { icon: IconQuote, title: "Other Inquiries", desc: "Have other questions? Ask away." },
  ];

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      <SEO title="Contact" description="Browse and search through our extensive collection of modern, accessible icons with brand colors and animations." />
      <HeroBackground className="pointer-events-none z-0" />
      <div className="relative z-10">
        <SiteHeader />
        <main className="max-w-7xl mx-auto px-6 pt-32 pb-20">
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16 text-center"
          >
            <div className="max-w-4xl mx-auto px-4 text-center py-8">
              <h1 className="text-3xl sm:text-6xl font-medium text-white uppercase">
                Reach Out to Iconza for Support
              </h1>
              <p className="mt-4 text-lg text-gray-300 max-w-2xl mx-auto">
                Can't find the icon you're looking for?
              </p>
            </div>

          </motion.section>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Reasons - Left Side */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-2xl font-medium text-neutral-100 mb-2">How can I help?</h2>
                <p className="text-neutral-400 mb-8">Choose from the options below or send me a custom message.</p>
              </div>

              <div className="space-y-4">
                {reasons.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="p-6 bg-neutral-100/10 rounded-xl border border-gray-500/30 hover:border-neutral-700/50 transition-colors"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-lime-500/10 rounded-2xl flex items-center justify-center text-lime-500">
                        <item.icon size={24} />
                      </div>
                      <div>
                        <h3 className="font-medium text-neutral-100 mb-1">{item.title}</h3>
                        <p className="text-sm text-neutral-400">{item.desc}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Form - Right Side */}
            <motion.section
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-neutral-900/20 rounded-2xl border border-neutral-800/50 p-8"
            >
              <h2 className="text-2xl font-medium text-neutral-100 mb-8">Send Message</h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-2">Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-neutral-950 border border-neutral-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-700 text-neutral-100"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-2">Message *</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={4}
                    className="w-full px-4 py-3 bg-neutral-950 border border-neutral-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-neutral-700 text-neutral-100 resize-none"
                    placeholder="Your message..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-2">Attachment</label>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4">
                      <input type="file" ref={fileRef} onChange={handleFile} className="hidden" />
                      <button
                        onClick={() => fileRef.current?.click()}
                        className="flex items-center gap-2 px-4 py-2 bg-neutral-800 border border-neutral-700 rounded-lg text-sm text-neutral-300 hover:bg-neutral-700 transition-colors"
                      >
                        <IconPaperclip size={17} className="text-neutral-300" />
                        <span>Choose File</span>
                      </button>
                      <span className="text-xs text-neutral-500">Max 20MB</span>
                    </div>

                    {preview && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="p-4 bg-neutral-950 border border-neutral-800 rounded-xl flex items-center gap-4"
                      >
                        {preview.type === 'image' ? (
                          <img src={preview.url} className="w-12 h-12 object-cover rounded" />
                        ) : (
                          <div className="w-12 h-12 bg-neutral-800 rounded flex items-center justify-center text-xs font-mono">
                            {preview.ext}
                          </div>
                        )}
                        <div className="flex-1">
                          <p className="text-sm font-medium text-neutral-100">{preview.name}</p>
                          <p className="text-xs text-neutral-500">{formatSize(preview.size)}</p>
                        </div>
                        <button onClick={removeFile} className="text-neutral-400 hover:text-neutral-600">✕</button>
                      </motion.div>
                    )}
                  </div>
                </div>

                {status && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={`p-4 rounded-xl ${status.type === 'success' ? 'bg-green-900/20 text-green-200' : 'bg-red-900/20 text-red-200'}`}
                  >
                    {status.msg}
                  </motion.div>
                )}

                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="relative w-full py-3 bg-neutral-100 text-neutral-900 rounded-xl font-medium hover:scale-[1.02] transition-transform disabled:opacity-50 overflow-hidden group"
                >
                  {loading ? (
                    <div className="flex items-center justify-center gap-2">
                      <IconLoader2 className="animate-spin w-5 h-5" />
                      <span>Sending...</span>
                    </div>
                  ) : (
                    <>
                      <span className="absolute inset-0 flex items-center justify-center">
                        <IconSend
                          size={18}
                          className="text-neutral-900 opacity-0 translate-y-full group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-in-out"
                        />
                      </span>
                      <span className="block text-center transition-all duration-300 ease-in-out group-hover:-translate-y-full group-hover:opacity-0">
                        Send Message
                      </span>
                    </>
                  )}
                </button>

              </div>
            </motion.section>

            {/* Confirmation Modal */}
            <AnimatePresence>
              {showModal && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
                  onClick={() => setShowModal(false)}
                >
                  <motion.div
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0.9 }}
                    onClick={(e) => e.stopPropagation()}
                    className="bg-neutral-900 rounded-2xl p-6 w-full max-w-md"
                  >
                    <h3 className="text-lg font-medium mb-4">Confirm Send</h3>

                    <div className="space-y-2 mb-6 text-sm text-neutral-300">
                      <p><strong>Name:</strong> {form.name}</p>
                      <p><strong>Message:</strong> {form.message}</p>
                      {file && <p><strong>File:</strong> {file.name}</p>}
                    </div>

                    <div className="mb-4 text-sm text-yellow-400 font-medium bg-yellow-900/20 rounded-lg px-3 py-2">
                      <IconAlertTriangle className="inline w-4 h-4 mr-1" />
                      This action cannot be undone.
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() => setShowModal(false)}
                        className="relative flex-1 py-2 bg-red-600/10 text-red-400 inset-ring-red-400/20 rounded-xl overflow-hidden group text-sm">
                        <div className="absolute inset-0 flex items-center justify-center transition-all duration-300 opacity-0 translate-y-full group-hover:translate-y-0 group-hover:opacity-100">
                          <IconX size={16} />
                        </div>
                        <span className="block transition-all duration-300 group-hover:-translate-y-full group-hover:opacity-0">
                          Cancel
                        </span>
                      </button>

                      <button
                        onClick={sendMessage}
                        className="relative flex-1 py-2 bg-neutral-100 text-neutral-900 rounded-xl overflow-hidden group text-sm">
                        <div className="absolute inset-0 flex items-center justify-center transition-all duration-300 opacity-0 translate-y-full group-hover:translate-y-0 group-hover:opacity-100">
                          <IconSend size={16} />
                        </div>
                        <span className="block transition-all duration-300 group-hover:-translate-y-full group-hover:opacity-0">
                          Send
                        </span>
                      </button>
                    </div>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>

          </div>
        </main>
        <SiteFooter />
      </div>
    </div >
  );
};

export default ContactPage;