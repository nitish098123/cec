"use client";

import { Image } from "antd";

import type { TeamMember } from "@/lib/team-members";

interface TeamMemberGridProps {
  members: TeamMember[];
}

export function TeamMemberGrid({ members }: TeamMemberGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
      {members.map((member, index) => (
        <div
          key={`${member.name}-${index}`}
          className="group relative aspect-[3/4] overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-sm"
        >
          <Image
            preview={false}
            alt={member.name}
            src={member.image_url}
            width={400}
            height={533}
            className="h-full w-full object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
          />
          <div className="absolute bottom-4 left-1/2 w-[90%] -translate-x-1/2 rounded-xl bg-white px-4 py-3 text-center shadow-lg">
            <p className="text-base font-semibold leading-tight text-[#102a43] md:text-lg">
              {member.name}
            </p>
            <p className="mt-1 text-sm text-gray-600">{member.designation}</p>
            <p className="mt-1 text-xs text-gray-500">Phone: {member.phone}</p>
            {member.email && (
              <p className="mt-0.5 break-all text-xs text-gray-500">
                Email: {member.email}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
