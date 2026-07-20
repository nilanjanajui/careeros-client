"use client";
import { useMemo } from "react";
import Link from "next/link";
import { motion, Variants } from "framer-motion";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import { useApplicationsQuery } from "@/hooks/useApplications";
import { ApplicationStatus } from "@/types/application";
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
} from "recharts";

const STATUS_COLORS: Record<ApplicationStatus, string> = {
    saved: "#e0e3e5",
    applied: "#dce0e4",
    interview: "#4f46e5",
    offer: "#006e4b",
    rejected: "#ba1a1a",
};

const STATUS_LABELS: Record<ApplicationStatus, string> = {
    saved: "Saved",
    applied: "Applied",
    interview: "Interview",
    offer: "Offer",
    rejected: "Rejected",
};

function StatCard({ label, value }: { label: string; value: number }) {
    return (
        <div className="rounded-card bg-surface-container-lowest p-6 shadow-card h-full">
            <p className="font-body text-xs font-medium uppercase tracking-wide text-on-surface-variant">{label}</p>
            <p className="mt-2 font-heading text-h3 text-on-surface">{value}</p>
        </div>
    );
}

const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.1 },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 300, damping: 24 } },
};

function DashboardView() {
    const { data: applications, isLoading, isError } = useApplicationsQuery();

    const stats = useMemo(() => {
        const list = applications ?? [];
        const byStatus: Record<ApplicationStatus, number> = {
            saved: 0,
            applied: 0,
            interview: 0,
            offer: 0,
            rejected: 0,
        };
        for (const app of list) byStatus[app.status]++;

        const statusData = (Object.keys(byStatus) as ApplicationStatus[])
            .filter((status) => byStatus[status] > 0)
            .map((status) => ({ name: STATUS_LABELS[status], value: byStatus[status], status }));

        const now = new Date();
        const monthBuckets: { key: string; label: string; count: number }[] = [];
        for (let i = 5; i >= 0; i--) {
            const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
            monthBuckets.push({
                key: `${d.getFullYear()}-${d.getMonth()}`,
                label: d.toLocaleDateString(undefined, { month: "short" }),
                count: 0,
            });
        }
        for (const app of list) {
            const created = new Date(app.createdAt);
            const key = `${created.getFullYear()}-${created.getMonth()}`;
            const bucket = monthBuckets.find((b) => b.key === key);
            if (bucket) bucket.count++;
        }

        return {
            total: list.length,
            interviews: byStatus.interview,
            offers: byStatus.offer,
            saved: byStatus.saved,
            statusData,
            monthBuckets,
        };
    }, [applications]);

    if (isLoading) {
        return <div className="mx-auto max-w-6xl px-4 py-16 font-body text-on-surface-variant">Loading dashboard…</div>;
    }

    if (isError) {
        return (
            <div className="mx-auto max-w-6xl px-4 py-16 font-body text-error">
                Couldn&apos;t load your application data.
            </div>
        );
    }

    if (stats.total === 0) {
        return (
            <div className="mx-auto max-w-2xl px-4 py-16 text-center">
                <h1 className="font-heading text-h3 text-on-surface">Dashboard</h1>
                <p className="mt-4 rounded-card bg-surface-container-low p-8 font-body text-sm text-on-surface-variant">
                    No applications tracked yet — once you save or apply to jobs, your activity shows up here.
                </p>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-6xl px-4 py-12">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <h1 className="font-heading text-h3 text-on-surface">Dashboard</h1>
                <Link
                    href="/tools/content-generator"
                    className="inline-flex items-center gap-2 rounded-input bg-primary px-5 py-2.5 font-body text-sm font-medium text-on-primary shadow-sm transition-colors hover:bg-primary-container hover:text-on-primary-container"
                >
                    <SparklesIcon />
                    AI Content Generator
                </Link>
            </div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4"
            >
                <motion.div variants={itemVariants}>
                    <StatCard label="Total Applications" value={stats.total} />
                </motion.div>
                <motion.div variants={itemVariants}>
                    <StatCard label="Interviews" value={stats.interviews} />
                </motion.div>
                <motion.div variants={itemVariants}>
                    <StatCard label="Offers" value={stats.offers} />
                </motion.div>
                <motion.div variants={itemVariants}>
                    <StatCard label="Saved Jobs" value={stats.saved} />
                </motion.div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, type: "spring", stiffness: 300, damping: 24 }}
                className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2"
            >
                <div className="rounded-card bg-surface-container-lowest p-6 shadow-card">
                    <h2 className="font-heading text-h5 text-on-surface">Status Distribution</h2>
                    <div className="mt-4 h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie data={stats.statusData} dataKey="value" nameKey="name" innerRadius={50} outerRadius={80}>
                                    {stats.statusData.map((entry) => (
                                        <Cell key={entry.status} fill={STATUS_COLORS[entry.status]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-3">
                        {stats.statusData.map((entry) => (
                            <span key={entry.status} className="flex items-center gap-1.5 font-body text-xs text-on-surface-variant">
                                <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: STATUS_COLORS[entry.status] }} />
                                {entry.name} ({entry.value})
                            </span>
                        ))}
                    </div>
                </div>

                <div className="rounded-card bg-surface-container-lowest p-6 shadow-card">
                    <h2 className="font-heading text-h5 text-on-surface">Monthly Applications</h2>
                    <div className="mt-4 h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={stats.monthBuckets}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#e0e3e5" vertical={false} />
                                <XAxis dataKey="label" tick={{ fontSize: 12 }} axisLine={false} tickLine={false} />
                                <YAxis allowDecimals={false} tick={{ fontSize: 12 }} axisLine={false} tickLine={false} width={24} />
                                <Tooltip />
                                <Bar dataKey="count" fill="#4f46e5" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

export default function DashboardPage() {
    return (
        <ProtectedRoute>
            <DashboardView />
        </ProtectedRoute>
    );
}

function SparklesIcon() {
    return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 3v3" />
            <path d="M18.5 5.5l-2 2" />
            <path d="M21 12h-3" />
            <path d="M18.5 18.5l-2-2" />
            <path d="M12 21v-3" />
            <path d="M5.5 18.5l2-2" />
            <path d="M3 12h3" />
            <path d="M5.5 5.5l2 2" />
        </svg>
    );
}