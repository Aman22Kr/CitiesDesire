import React, { useState } from 'react';
import { Briefcase, MapPin, Clock, Sparkles, CheckCircle2, User, Mail, Phone, FileText } from 'lucide-react';
import { CAREERS_LIST } from '../data/mockData';
import { useApp } from '../context/AppContext';
import { AdPlaceholder } from '../components/AdPlaceholder';

export const CareersPage: React.FC = () => {
  const { showToast } = useApp();
  const [selectedJob, setSelectedJob] = useState<string>(CAREERS_LIST[0].id);

  const [applicantName, setApplicantName] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');
  const [applicantPhone, setApplicantPhone] = useState('');
  const [portfolioLink, setPortfolioLink] = useState('');
  const [coverNote, setCoverNote] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const activeJob = CAREERS_LIST.find((j) => j.id === selectedJob) || CAREERS_LIST[0];

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!applicantName.trim() || !applicantEmail.trim() || !applicantPhone.trim()) {
      showToast('Please fill all mandatory contact fields.', 'error');
      return;
    }

    setSubmitted(true);
    showToast(`Application submitted for ${activeJob.title}!`, 'success');
  };

  return (
    <div className="min-h-screen bg-[#0c0a09] text-[#f5f5f4]">
      {/* Header Banner */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 border-b border-[#292524] bg-gradient-to-b from-[#141210] to-[#0c0a09]">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1c1917] border border-[#c29b38]/40 text-[#c29b38] text-xs font-mono uppercase tracking-widest mb-6">
            <Briefcase className="w-3.5 h-3.5" />
            <span>Join the Brigade</span>
          </div>

          <h1 className="font-heritage text-4xl sm:text-6xl font-bold text-[#f5f5f4]">
            Careers at CitiesDesire
          </h1>

          <p className="mt-4 text-sm text-[#a8a29e] max-w-xl mx-auto leading-relaxed">
            Preserve authentic culinary craftsmanship. We mentor the next generation of North Indian tandoor masters, sommeliers, and hospitality leaders.
          </p>
        </div>
      </section>

      {/* Main Careers Split */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left: Job Openings List */}
          <div className="lg:col-span-5 space-y-4">
            <h3 className="font-heritage text-2xl font-bold text-[#f5f5f4] mb-2">
              Current Open Roles
            </h3>

            <div className="space-y-3">
              {CAREERS_LIST.map((job) => (
                <button
                  key={job.id}
                  onClick={() => {
                    setSelectedJob(job.id);
                    setSubmitted(false);
                  }}
                  className={`w-full text-left p-5 rounded-xl border transition-all ${
                    selectedJob === job.id
                      ? 'bg-[#1c1917] border-[#c29b38] shadow-md shadow-[#c29b38]/10'
                      : 'bg-[#141210] border-[#292524] hover:border-[#3d3835]'
                  }`}
                >
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#c29b38]">
                    {job.department}
                  </span>
                  <h4 className="font-heritage text-lg font-bold text-[#f5f5f4] mt-0.5">
                    {job.title}
                  </h4>
                  <div className="mt-3 flex items-center gap-3 text-xs text-[#a8a29e]">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#c29b38]" />
                      {job.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#c29b38]" />
                      {job.experience}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Right: Selected Job Details & Application Form */}
          <div className="lg:col-span-7 bg-[#141210] border border-[#292524] rounded-2xl p-6 sm:p-10">
            <div className="pb-6 border-b border-[#292524]">
              <span className="text-xs font-mono uppercase tracking-widest text-[#c29b38]">
                Role Overview
              </span>
              <h2 className="font-heritage text-3xl font-bold text-[#f5f5f4] mt-1">
                {activeJob.title}
              </h2>
              <p className="text-xs text-[#c29b38] mt-1">
                {activeJob.department} · {activeJob.location} · {activeJob.type}
              </p>
              <p className="text-sm text-[#d6d3d1] mt-4 leading-relaxed">
                {activeJob.description}
              </p>
            </div>

            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-14 h-14 rounded-full bg-[#1c1917] border border-[#c29b38] mx-auto flex items-center justify-center text-[#c29b38]">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <h3 className="font-heritage text-2xl font-bold text-[#f5f5f4]">
                  Application Received!
                </h3>
                <p className="text-xs text-[#a8a29e] max-w-sm mx-auto">
                  Thank you for applying to CitiesDesire. Our culinary talent acquisition team will review your profile and reach out within 48 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-4 px-5 py-2 text-xs uppercase tracking-wider font-semibold text-[#0c0a09] bg-[#c29b38] rounded"
                >
                  Submit Another Application
                </button>
              </div>
            ) : (
              <form onSubmit={handleApply} className="pt-6 space-y-4">
                <h3 className="font-heritage text-xl font-bold text-[#f5f5f4]">
                  Apply for this Position
                </h3>

                <div>
                  <input
                    type="text"
                    value={applicantName}
                    onChange={(e) => setApplicantName(e.target.value)}
                    placeholder="Your Full Name *"
                    className="w-full px-4 py-2.5 bg-[#0c0a09] border border-[#292524] focus:border-[#c29b38] rounded text-xs text-[#f5f5f4] placeholder-[#78716c] focus:outline-none"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="email"
                    value={applicantEmail}
                    onChange={(e) => setApplicantEmail(e.target.value)}
                    placeholder="Email Address *"
                    className="w-full px-4 py-2.5 bg-[#0c0a09] border border-[#292524] focus:border-[#c29b38] rounded text-xs text-[#f5f5f4] placeholder-[#78716c] focus:outline-none"
                    required
                  />
                  <input
                    type="tel"
                    value={applicantPhone}
                    onChange={(e) => setApplicantPhone(e.target.value)}
                    placeholder="Phone Number *"
                    className="w-full px-4 py-2.5 bg-[#0c0a09] border border-[#292524] focus:border-[#c29b38] rounded text-xs text-[#f5f5f4] placeholder-[#78716c] focus:outline-none font-mono"
                    required
                  />
                </div>

                <div>
                  <input
                    type="url"
                    value={portfolioLink}
                    onChange={(e) => setPortfolioLink(e.target.value)}
                    placeholder="LinkedIn Profile / Culinary Portfolio URL"
                    className="w-full px-4 py-2.5 bg-[#0c0a09] border border-[#292524] focus:border-[#c29b38] rounded text-xs text-[#f5f5f4] placeholder-[#78716c] focus:outline-none"
                  />
                </div>

                <div>
                  <textarea
                    value={coverNote}
                    onChange={(e) => setCoverNote(e.target.value)}
                    rows={3}
                    placeholder="Tell us about your culinary philosophy or hospitality experience..."
                    className="w-full px-4 py-2.5 bg-[#0c0a09] border border-[#292524] focus:border-[#c29b38] rounded text-xs text-[#f5f5f4] placeholder-[#78716c] focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 text-xs font-semibold uppercase tracking-wider text-[#0c0a09] bg-[#c29b38] hover:bg-[#d4ae4b] rounded transition-colors"
                >
                  Submit Application
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Ad Placeholder */}
      <AdPlaceholder slotName="CitiesDesire Culinary Academy &amp; Apprenticeship" />
    </div>
  );
};
