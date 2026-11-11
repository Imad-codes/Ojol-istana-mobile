import React, { useState } from 'react';
import { Send, X, Shield, Phone, Bike, User } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ChatModal: React.FC = () => {
  const {
    currentUser,
    orders,
    chatMessages,
    sendChatMessage,
    isChatModalOpen,
    setIsChatModalOpen,
    setIsCallModalOpen,
  } = useApp();

  const [inputText, setInputText] = useState('');

  if (!isChatModalOpen) return null;

  const activeOrder = orders[0] || {
    id: 'OI-1048',
    driverName: 'Bima Saputra',
    passengerName: 'Raka Pradana',
  };

  const isDriver = currentUser?.role === 'driver';
  const partnerName = isDriver ? activeOrder.passengerName : activeOrder.driverName;
  const partnerRole = isDriver ? 'Penumpang · Unit Administrasi' : 'Driver Terverifikasi · DEMO 024';

  const orderMessages = chatMessages.filter(
    (m) => m.orderId === activeOrder.id || m.orderId === 'OI-1048'
  );

  const handleSend = (textToSend?: string) => {
    const text = textToSend || inputText;
    if (!text.trim()) return;
    sendChatMessage(activeOrder.id, text);
    setInputText('');
  };

  const quickReplies = isDriver
    ? [
        'Saya sudah sampai di titik jemput.',
        'Sedang menuju ke lokasi, estimasi 3 menit.',
        'Helm sudah saya siapkan, terima kasih.',
        'Mohon siapkan 4 digit kode penjemputan.',
      ]
    : [
        'Saya sudah menunggu di depan pintu lobi.',
        'Baik Pak, saya tunggu.',
        'Saya mengenakan kemeja batik biru.',
        'Bisa tolong berhenti di dekat pos jaga?',
      ];

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden flex flex-col h-[580px]">
        {/* Header */}
        <div className="px-5 py-3.5 bg-[#10243e] text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-slate-700/80 border border-slate-600 flex items-center justify-center text-xs font-bold text-amber-300">
              {isDriver ? <User className="w-4 h-4" /> : <Bike className="w-4 h-4" />}
            </div>
            <div>
              <h3 className="text-sm font-bold leading-tight">{partnerName}</h3>
              <p className="text-[11px] text-slate-300 leading-tight flex items-center gap-1 mt-0.5">
                <Shield className="w-3 h-3 text-emerald-400" />
                <span>{partnerRole}</span>
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setIsChatModalOpen(false);
                setIsCallModalOpen(true);
              }}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
              title="Panggil Suara"
            >
              <Phone className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsChatModalOpen(false)}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Security badge */}
        <div className="bg-emerald-50 border-b border-emerald-100 px-4 py-1.5 text-[11px] text-emerald-800 flex items-center justify-center gap-1.5">
          <Shield className="w-3.5 h-3.5 text-emerald-600" />
          <span>Saluran terenkripsi internal Sekretariat Istana</span>
        </div>

        {/* Message Thread */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50">
          {orderMessages.map((msg) => {
            const isMe = msg.senderRole === currentUser?.role;
            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
              >
                <div className="text-[10px] text-slate-400 mb-0.5 px-1">
                  {msg.senderName} · {msg.timestamp}
                </div>
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-xs shadow-2xs leading-relaxed ${
                    isMe
                      ? 'bg-[#1b3a61] text-white rounded-br-xs'
                      : 'bg-white text-slate-800 border border-slate-200/80 rounded-bl-xs'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Replies */}
        <div className="px-4 py-2 bg-white border-t border-slate-100 flex gap-1.5 overflow-x-auto no-scrollbar">
          {quickReplies.map((reply, i) => (
            <button
              key={i}
              onClick={() => handleSend(reply)}
              className="text-[11px] whitespace-nowrap bg-slate-100 hover:bg-slate-200 text-slate-700 px-2.5 py-1 rounded-full transition-colors shrink-0"
            >
              {reply}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-white border-t border-slate-200 flex items-center gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSend();
            }}
            placeholder={`Ketik pesan untuk ${partnerName}...`}
            className="flex-1 text-xs px-3.5 py-2.5 bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:border-[#1b3a61] focus:bg-white text-slate-800"
          />
          <button
            onClick={() => handleSend()}
            disabled={!inputText.trim()}
            className="p-2.5 bg-[#1b3a61] hover:bg-[#152e4d] disabled:opacity-40 text-white rounded-xl transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
