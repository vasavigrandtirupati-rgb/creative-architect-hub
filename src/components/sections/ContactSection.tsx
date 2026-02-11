import { siteData } from "@/data/data";
import { motion } from "framer-motion";
import { useState } from "react";
import { Send, Mail, Phone, MapPin } from "lucide-react";

const ContactSection = () => {
  const { email, phone, location } = siteData.personalInfo;
  const [form, setForm] = useState({ name: "", email: "", type: "Web Application", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    alert("Message sent! (Demo)");
  };

  return (
    <section id="contact" className="bg-secondary section-padding">
      <div className="container mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-display text-center mb-4"
        >
          LET'S BUILD SOMETHING
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-center text-sm opacity-70 mb-16"
        >
          Have a project in mind? I'm available for freelance work and consulting.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto bg-card rounded-lg p-8 accent-shadow"
        >
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid md:grid-cols-2 gap-5">
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider block mb-2">Name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="John Doe"
                  className="w-full px-4 py-3 rounded-md border border-input bg-card text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                  required
                />
              </div>
              <div>
                <label className="text-xs font-semibold uppercase tracking-wider block mb-2">Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="john@example.com"
                  className="w-full px-4 py-3 rounded-md border border-input bg-card text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                  required
                />
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider block mb-2">Project Type</label>
              <select
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
                className="w-full px-4 py-3 rounded-md border border-input bg-card text-sm focus:outline-none focus:ring-2 focus:ring-accent"
              >
                <option>Web Application</option>
                <option>Mobile App</option>
                <option>Digital Marketing</option>
                <option>SEO Optimization</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider block mb-2">Message</label>
              <textarea
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="Tell me about your project..."
                rows={4}
                className="w-full px-4 py-3 rounded-md border border-input bg-card text-sm resize-none focus:outline-none focus:ring-2 focus:ring-accent"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-primary text-foreground py-3 rounded-md font-heading font-bold text-sm hover:opacity-90 transition-opacity accent-shadow-sm flex items-center justify-center gap-2"
            >
              <Send size={16} /> SEND MESSAGE
            </button>
          </form>

          {/* Contact info */}
          <div className="mt-8 pt-6 border-t border-input grid md:grid-cols-3 gap-4 text-center">
            <div className="flex flex-col items-center gap-1">
              <Mail size={16} className="text-accent" />
              <span className="text-xs">{email}</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <Phone size={16} className="text-accent" />
              <span className="text-xs">{phone}</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <MapPin size={16} className="text-accent" />
              <span className="text-xs">{location}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
