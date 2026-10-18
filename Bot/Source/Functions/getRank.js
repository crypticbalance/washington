const rolesList = {
    "Ownership": "1561418783179153559"
};

export function getRank(member) {
    return Object.entries(rolesList)
        .map(([name, roleId]) => ({
            name,
            role: member.guild.roles.cache.get(roleId)
        }))
        .filter(({ role }) => role && member.roles.cache.has(role.id))
        .sort((a, b) => b.role.position - a.role.position)[0]?.name ?? 'No Rank Available';
}