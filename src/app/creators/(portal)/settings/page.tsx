"use client";

import { Camera, Mail, Lock, Bell, Trash2, Save, User } from "lucide-react";
import Image from "next/image";

export default function SettingsPage() {
    return (
        <div className="max-w-4xl space-y-8 pb-20">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-white">Settings</h1>
                <p className="text-neutral-500 dark:text-neutral-400 mt-2">Manage your profile and account preferences.</p>
            </div>

            <div className="space-y-6">
                {/* Profile Section */}
                <section className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-6">
                    <h2 className="text-xl font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                        <User className="w-5 h-5" /> Public Profile
                    </h2>

                    <div className="flex flex-col md:flex-row gap-8 items-start">
                        <div className="flex-shrink-0 relative group cursor-pointer">
                            <div className="w-24 h-24 rounded-full bg-neutral-100 dark:bg-neutral-800 overflow-hidden border-2 border-dashed border-neutral-300 dark:border-neutral-700 flex items-center justify-center relative">
                                {/* Placeholder for no image, or actual image */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-orange-400 to-rose-400 opacity-100" />
                                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <Camera className="w-8 h-8 text-white" />
                                </div>
                            </div>
                            <div className="text-xs text-center mt-2 text-neutral-500">Change Photo</div>
                        </div>

                        <div className="flex-1 space-y-4 w-full">
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Display Name</label>
                                    <input
                                        type="text"
                                        defaultValue="Chef Ty"
                                        className="w-full px-4 py-2 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-orange-500 text-neutral-900 dark:text-white"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Username</label>
                                    <div className="relative">
                                        <span className="absolute left-4 top-2 text-neutral-400">@</span>
                                        <input
                                            type="text"
                                            defaultValue="chefty"
                                            className="w-full pl-8 pr-4 py-2 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-orange-500 text-neutral-900 dark:text-white"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Bio</label>
                                <textarea
                                    rows={3}
                                    defaultValue="Professional chef creating easy weeknight recipes. Love spicy food and ramen! 🍜"
                                    className="w-full px-4 py-2 rounded-xl bg-neutral-50 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-orange-500 text-neutral-900 dark:text-white resize-none"
                                />
                                <div className="text-xs text-neutral-400 text-right">84 / 150</div>
                            </div>
                        </div>
                    </div>

                    <div className="pt-4 border-t border-neutral-200 dark:border-neutral-800 flex justify-end">
                        <button className="flex items-center gap-2 px-6 py-2 bg-neutral-900 dark:bg-white text-white dark:text-black rounded-xl font-bold hover:opacity-90 transition-opacity">
                            <Save className="w-4 h-4" /> Save Changes
                        </button>
                    </div>
                </section>

                {/* Account Security */}
                <section className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-6">
                    <h2 className="text-xl font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                        <Lock className="w-5 h-5" /> Account & Security
                    </h2>

                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700">
                            <div className="flex items-center gap-4">
                                <div className="p-2 bg-orange-100 dark:bg-orange-500/10 text-orange-600 dark:text-orange-500 rounded-lg">
                                    <Mail className="w-5 h-5" />
                                </div>
                                <div>
                                    <div className="font-medium text-neutral-900 dark:text-white">Email Address</div>
                                    <div className="text-sm text-neutral-500">tiger@flav.app</div>
                                </div>
                            </div>
                            <button className="text-sm font-medium text-orange-600 dark:text-orange-500 hover:text-orange-700 dark:hover:text-orange-400">Update</button>
                        </div>

                        <div className="flex items-center justify-between p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/50 border border-neutral-200 dark:border-neutral-700">
                            <div className="flex items-center gap-4">
                                <div className="p-2 bg-neutral-200 dark:bg-neutral-700 text-neutral-600 dark:text-neutral-400 rounded-lg">
                                    <Lock className="w-5 h-5" />
                                </div>
                                <div>
                                    <div className="font-medium text-neutral-900 dark:text-white">Password</div>
                                    <div className="text-sm text-neutral-500">Last changed 3 months ago</div>
                                </div>
                            </div>
                            <button className="text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white">Reset</button>
                        </div>
                    </div>
                </section>

                {/* Preferences */}
                <section className="p-6 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 space-y-6">
                    <h2 className="text-xl font-bold text-neutral-900 dark:text-white flex items-center gap-2">
                        <Bell className="w-5 h-5" /> Notifications
                    </h2>
                    <div className="space-y-4">
                        {[
                            { label: "New subscriber notifications", desc: "Get emailed when someone subscribes", default: true },
                            { label: "Weekly performance digest", desc: "Summary of your views and earnings", default: true },
                            { label: "Marketing emails", desc: "Tips and tricks to grow your channel", default: false },
                        ].map((pref, i) => (
                            <div key={i} className="flex items-start justify-between">
                                <div>
                                    <div className="font-medium text-neutral-900 dark:text-white">{pref.label}</div>
                                    <div className="text-sm text-neutral-500">{pref.desc}</div>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" className="sr-only peer" defaultChecked={pref.default} />
                                    <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none rounded-full peer dark:bg-neutral-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                                </label>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Danger Zone */}
                <section className="p-6 rounded-2xl border border-red-200 dark:border-red-900/30 bg-red-50 dark:bg-red-950/10 space-y-4">
                    <h2 className="text-xl font-bold text-red-600 dark:text-red-500 flex items-center gap-2">
                        <Trash2 className="w-5 h-5" /> Danger Zone
                    </h2>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                        Once you delete your account, there is no going back. Please be certain.
                    </p>
                    <button className="px-4 py-2 bg-white dark:bg-red-950 text-red-600 dark:text-red-500 border border-red-200 dark:border-red-900 rounded-xl font-medium text-sm hover:bg-red-50 dark:hover:bg-red-900/40 transition-colors">
                        Delete Account
                    </button>
                </section>
            </div>
        </div>
    );
}
